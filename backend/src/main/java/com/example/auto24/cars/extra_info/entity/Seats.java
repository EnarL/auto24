package com.example.auto24.cars.extra_info.entity;


import lombok.Data;

@Data
public class Seats {
    private boolean nahkpolster;
    private String nahkpolsterLisainfo;
    private boolean poolnahkpolster;
    private String poolnahkpolsterLisainfo;
    private boolean veluurpolster;
    private String veluurpolsterLisainfo;
    private boolean tekstiilpolster;
    private String tekstiilpolsterLisainfo;
    private boolean elektriliseltReguleeritavadIstmed;
    private boolean ohugaReguleeritavIste;
    private boolean istmedReguleeritavaKorgusega;
    private boolean istmesoojendused;
    private boolean reguleeritavaKumerusegaSeljatugi;
    private boolean massaazifunktsioonigaIstmed;
    private String massaazifunktsioonigaIstmedLisainfo;
    private boolean ventileeritavadIstmed;
    private boolean kaetugiEes;
    private boolean kaetugiTaga;
    private boolean kaassoitjaIstmeSeljatugiAllaklapitav;
    private boolean tagaistmeSeljatugiAllaklapitav;
    private boolean comfortIstmed;
    private boolean sportistmed;
}