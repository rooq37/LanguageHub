package com.zrcaw.langshub.service.s3;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.waiters.WaiterResponse;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.waiters.S3Waiter;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class S3Service {

    private static final String S3_URI = "s3://${bucketName}${fileName}";

    @Value("${langshub.bucketname}")
    private String bucketName;

    private static final Region region = Region.US_EAST_1;
    protected S3Client s3Client;

    @PostConstruct
    public void init() {
        s3Client = S3Client.builder().region(region).build();
        createBucket();
    }

    public void createBucket() {
        if(isBucketCreated(bucketName))
            return;

        createBucket(bucketName);
    }

    public void uploadObject(String key, RequestBody requestBody) {
        if(getListOfObjects().contains(key))
            deleteObject(key);

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(objectRequest, requestBody);
    }

    public byte[] downloadObject(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        byte[] bytes = new byte[1024];
        try {
            bytes = s3Client.getObject(getObjectRequest).readAllBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }

    public String getObjectUri(String key) {
        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        String uri = S3_URI
                .replace("${bucketName}", bucketName)
                .replace("${fileName}", s3Client.utilities().getUrl(request).getPath());

        return uri;
    }

    public void deleteObject(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    private List<String> getListOfObjects() {
        ListObjectsRequest listObjects = ListObjectsRequest
                .builder()
                .bucket(bucketName)
                .build();

        ListObjectsResponse res = s3Client.listObjects(listObjects);
        return res.contents().stream().map(S3Object::key).collect(Collectors.toList());
    }

    private boolean isBucketCreated(String bucketName) {
        return getAllBucketNames().contains(bucketName);
    }

    private List<String> getAllBucketNames() {
        ListBucketsRequest listBucketsRequest = ListBucketsRequest.builder().build();
        ListBucketsResponse listBucketsResponse = s3Client.listBuckets(listBucketsRequest);
        return listBucketsResponse.buckets().stream().map(Bucket::name).collect(Collectors.toList());
    }

    private void createBucket(String bucketName) {
        try {
            S3Waiter s3Waiter = s3Client.waiter();
            CreateBucketRequest bucketRequest = CreateBucketRequest.builder()
                    .bucket(bucketName)
                    .createBucketConfiguration(
                            CreateBucketConfiguration.builder().build())
                    .build();

            s3Client.createBucket(bucketRequest);
            HeadBucketRequest bucketRequestWait = HeadBucketRequest.builder()
                    .bucket(bucketName)
                    .build();

            WaiterResponse<HeadBucketResponse> waiterResponse = s3Waiter.waitUntilBucketExists(bucketRequestWait);
            waiterResponse.matched().response().ifPresent(System.out::println);

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
        }
    }

}
