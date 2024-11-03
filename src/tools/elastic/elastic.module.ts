import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [ElasticService],
    exports: [ElasticService],
})
export class ElasticModule implements OnModuleInit {
    constructor(private readonly elasticService: ElasticService) {}

    onModuleInit() {
        this.elasticService.connect();
    }
}
