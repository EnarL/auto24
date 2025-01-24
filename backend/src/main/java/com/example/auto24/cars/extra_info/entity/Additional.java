package com.example.auto24.cars.extra_info.entity;

import lombok.Data;

@Data
public class Additional {
    private boolean reguleeritavVedrustus;
    private boolean ohkvedrustus;
    private boolean startStoppSusteem;
    private boolean pistikupesad12v;
    private boolean katusereelingud;
    private String katusereelingudLisainfo;
    private boolean suusakott;
    private boolean rehviparanduskomplekt;
    private boolean jahutusegaKindalaegas;
    private boolean valistemperatuuriNaidik;
    private boolean topeltklaasid;
    private String topeltklaasidLisainfo;
    private boolean elektriliseSoojendusegaEsiklaas;
    private boolean tagaklaasiSoojendus;
    private boolean aknapesupihustiteSulatus;
    private boolean pagasikate;
    private boolean pagasiVorkPakiruumis;
    private boolean salongiJaPakiruumiEraldusvork;
    private boolean kaubakinnituseKonksud;
    private boolean tagaklaasiPuhasti;
    private boolean paigaldatudTulekustuti;
    private boolean veokonks;
    private boolean haagiseStabiliseerimissusteem;
    private boolean reisiarvesti;
    private boolean esiJaTagaratastePorikummid;
    private boolean invavarustus;
    private boolean neljarattaPooramine;
    private boolean arvelKuiN1Kaubik;
    private String muudLisad; // Additional field for other extras, separated by semicolon
}