import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ElasticService {
    private client: Client;
    private readonly logger = new Logger(ElasticService.name);

    constructor(private readonly configService: ConfigService) {}

    async indexDocument(index: string, documentId: string, document: Record<string, any>): Promise<void> {
        await this.client.index({
            index,
            id: documentId,
            body: document,
        });
    }

    async searchDocuments(index: string, query: string, fields: string[], page: number, size: number, sourceFields: string[]): Promise<any> {
        const from = (page - 1) * size
            const searchQuery = query.trim() === '' 
            ? { match_all: {} }  
            : { multi_match: { query, fields, operator: "and" } }; 

        const body = await this.client.search({
            index,
            _source: sourceFields,
            body: {
                from,
                size: size,
                // @ts-ignore
                query: searchQuery
            },
        });

        // @ts-ignore
        const totalDocuments = body.hits.total.value;
        const totalPages = Math.ceil(totalDocuments / size);
        
        return {
            total: totalDocuments,
            totalPages,
            currentPage: page,
            size,
            results: body.hits.hits,
        };
    }

    async deleteDocument(index: string, documentId: string): Promise<void> {
        await this.client.delete({
            index,
            id: documentId,
        });
    }

    connect() {
        const elasticApiKey = this.configService.getOrThrow('ELASTIC_API_KEY');
        const caCertPath = path.join('certs/ca/ca.crt');  // Update to match your certificate location

        this.client = new Client({
            node: 'https://localhost:9200', // Ensure this matches your Elasticsearch setup
            auth: {
                apiKey: elasticApiKey,
            },
            tls: {
                ca: fs.readFileSync(caCertPath),
                rejectUnauthorized: true,
            },
        });

        // Test the connection
        this.client.info()
            .then(response => this.logger.log('Elasticsearch connection successful:', response))
            .catch(error => this.logger.error('Elasticsearch connection error:', error));
    }

    getClient(): Client {
        return this.client;
    }
}
