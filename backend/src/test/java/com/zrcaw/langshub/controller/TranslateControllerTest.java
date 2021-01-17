package com.zrcaw.langshub.controller;

import com.zrcaw.langshub.AbstractTest;
import com.zrcaw.langshub.dto.translate.LanguageCode;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.Is.is;

public class TranslateControllerTest extends AbstractTest {

    @Test
    public void PlToEnTranslateTest() {
        String expectedTranslatedText = "Lithuania! My homeland! You're like health.";

        Map<String, Object> translateRequest = new HashMap<>();
        translateRequest.put("sourceLanguageCode", LanguageCode.PL);
        translateRequest.put("targetLanguageCode", LanguageCode.EN);
        translateRequest.put("text", "Litwo! Ojczyzno moja! Ty jesteś jak zdrowie.");

        given().accept(ContentType.JSON).contentType(ContentType.JSON).body(translateRequest).
                when().post("/api/translate/text").
                then().statusCode(200)
                .body("translatedText", is(expectedTranslatedText));
    }

    @Test
    public void EnToPlTranslateTest() {
        String expectedTranslatedText = "W publikowaniu i projektowaniu graficznym Lorem ipsum jest tekstem zastępczym powszechnie używanym do wykazania formy wizualnej.";

        Map<String, Object> translateRequest = new HashMap<>();
        translateRequest.put("sourceLanguageCode", LanguageCode.EN);
        translateRequest.put("targetLanguageCode", LanguageCode.PL);
        translateRequest.put("text", "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.");

        given().accept(ContentType.JSON).contentType(ContentType.JSON).body(translateRequest).
                when().post("/api/translate/text").
                then().statusCode(200)
                .body("translatedText", is(expectedTranslatedText));
    }
}
