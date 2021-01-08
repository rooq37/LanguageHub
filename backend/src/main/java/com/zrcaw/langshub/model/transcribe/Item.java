package com.zrcaw.langshub.model.transcribe;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.services.transcribestreaming.model.Alternative;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Item {

    private String start_time;
    private String end_time;
    private List<Alternative> alternatives = new ArrayList<Alternative>();
    private String type;

}
