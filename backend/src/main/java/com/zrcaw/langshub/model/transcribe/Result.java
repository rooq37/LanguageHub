package com.zrcaw.langshub.model.transcribe;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Result {

    private List<Transcript> transcripts = new ArrayList<Transcript>();
    private List<Item>       items       = new ArrayList<Item>();

}
