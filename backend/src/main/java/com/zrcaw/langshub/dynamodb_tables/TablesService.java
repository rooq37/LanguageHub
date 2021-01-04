package com.zrcaw.langshub.dynamodb_tables;

import software.amazon.awssdk.core.waiters.WaiterResponse;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import software.amazon.awssdk.services.dynamodb.waiters.DynamoDbWaiter;

import java.util.ArrayList;
import java.util.List;

public abstract class TablesService {

    private Region region = Region.US_EAST_1;
    private DynamoDbClient ddb = DynamoDbClient.builder().region(region).build();

    public boolean isTableCreated(String tableName) {
        return getAllTableNames().contains(tableName);
    }

    public List<String> getAllTableNames() {
        ListTablesRequest request = ListTablesRequest.builder().build();
        ListTablesResponse response = ddb.listTables(request);
        return response.tableNames();
    }

    public List<Table> getAllTables() {
        List<Table> tables = new ArrayList<>();
        List<String> allTableNames = getAllTableNames();

        for (String tableName : allTableNames) {
            DescribeTableRequest request = DescribeTableRequest.builder().tableName(tableName).build();
            TableDescription tableInfo = ddb.describeTable(request).table();

            Table table = new Table(tableInfo.tableName(), tableInfo.tableSizeBytes(), tableInfo.creationDateTime());
            tables.add(table);
        }
        return tables;
    }

    public void createTable(String tableName, String key) {
        CreateTableRequest request = CreateTableRequest.builder()
                .attributeDefinitions(AttributeDefinition.builder()
                        .attributeName(key)
                        .attributeType(ScalarAttributeType.S)
                        .build())
                .keySchema(KeySchemaElement.builder()
                        .attributeName(key)
                        .keyType(KeyType.HASH)
                        .build())
                .provisionedThroughput(ProvisionedThroughput.builder()
                        .readCapacityUnits(10L)
                        .writeCapacityUnits(10L)
                        .build())
                .tableName(tableName)
                .build();

        createTable(request, tableName);
    }

    public void createTable(String tableName, String hashKey, String rangeKey) {
        CreateTableRequest request = CreateTableRequest.builder()
                .attributeDefinitions(
                        AttributeDefinition.builder()
                                .attributeName(hashKey)
                                .attributeType(ScalarAttributeType.S)
                                .build(),
                        AttributeDefinition.builder()
                                .attributeName(rangeKey)
                                .attributeType(ScalarAttributeType.S)
                                .build())
                .keySchema(
                        KeySchemaElement.builder()
                                .attributeName(hashKey)
                                .keyType(KeyType.HASH)
                                .build(),
                        KeySchemaElement.builder()
                                .attributeName(rangeKey)
                                .keyType(KeyType.RANGE)
                                .build())
                .provisionedThroughput(ProvisionedThroughput.builder()
                        .readCapacityUnits(10L)
                        .writeCapacityUnits(10L)
                        .build())
                .tableName(tableName)
                .build();

        createTable(request, tableName);
    }

    private void createTable(CreateTableRequest request, String tableName) {
        DynamoDbWaiter dbWaiter = ddb.waiter();

        CreateTableResponse response = ddb.createTable(request);
        DescribeTableRequest tableRequest = DescribeTableRequest.builder()
                .tableName(tableName)
                .build();

        WaiterResponse<DescribeTableResponse> waiterResponse = dbWaiter.waitUntilTableExists(r -> r.tableName(tableName));
        waiterResponse.matched().response().ifPresent(System.out::println);
    }

}
