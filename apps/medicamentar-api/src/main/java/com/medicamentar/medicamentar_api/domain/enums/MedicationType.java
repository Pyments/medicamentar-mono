package com.medicamentar.medicamentar_api.domain.enums;

public enum MedicationType {
  ORAL(0),
  TOPICO(1),
  OFTALMICO(2),
  INTRANASAL(3),
  INJETAVEL(4),
  SUBLINGUAL(5),
  TRANSDERMICO(6),
  RETAL(7),
  VAGINAL(8);

  private final int code;

  MedicationType(int code) {
      this.code = code;
  }

  public int getCode() {
      return code;
  }
}