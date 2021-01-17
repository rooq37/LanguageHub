package com.zrcaw.langshub.controller;

import com.zrcaw.langshub.AbstractTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.collection.IsMapContaining.hasEntry;
import static org.hamcrest.core.Is.is;

public class ExerciseControllerTest extends AbstractTest {

    @Test
    public void GetAllExercisesForAuthorTest() {
        String authorName = "Lisa";
        given().accept(ContentType.JSON).contentType(ContentType.JSON).pathParam("author", authorName).
                when().get("/api/exercises?author={author}").
                then().statusCode(200)
                .body("size()", is(6))
                .body("$", hasItem(allOf(hasEntry("author", authorName))));
    }

    @Test
    public void GetExerciseForAuthorTest() {
        String authorName = "Lisa";
        String exerciseName = "The exercise number 1";
        given().accept(ContentType.JSON).contentType(ContentType.JSON)
                .pathParam("author", authorName).pathParam("name", exerciseName).
                when().get("/api/exercises?author={author}&name={name}").
                then().statusCode(200).body("name", is(exerciseName)).body("author", is(authorName));
    }

    @Test
    public void EmptyExercisesListForAuthorTest() {
        given().accept(ContentType.JSON).contentType(ContentType.JSON)
                .pathParam("author", "RandomAuthor").
                when().get("/api/exercises?author={author}").
                then().statusCode(200).body("size()", is(0));
    }

    @Test
    public void ExerciseNotFoundNameTest() {
        given().accept(ContentType.JSON).contentType(ContentType.JSON)
                .pathParam("author", "Lisa").pathParam("name", "RandomName").
                when().get("/api/exercises?author={author}&name={name}").
                then().statusCode(404).body("messageText", is("The exercise of author Lisa with name RandomName doesn't exist!"));
    }
}
