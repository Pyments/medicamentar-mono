package com.medicamentar.medicamentar_api.domain.enums;

public enum MedicationUnity {
  mililitros(0),
  miligramas(1),
  gotas(2),
  comprimidos(3),
  subcutânea(4);

  private final int code;

  MedicationUnity(int code) {
      this.code = code;
  }

  public int getCode() {
      return code;
  }

}