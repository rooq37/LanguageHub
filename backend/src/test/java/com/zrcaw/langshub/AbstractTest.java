package com.zrcaw.langshub;

import org.springframework.boot.test.context.SpringBootTest;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(classes = LanguageHubApplication.class, webEnvironment = DEFINED_PORT)
public abstract class AbstractTest {
}
