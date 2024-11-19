package com.medicamentar.medicamentar_api.domain.entities;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "events_log")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventLog {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private String eventType;
  private String eventAction;
  private UUID eventReferenceId;

  @Setter(AccessLevel.NONE)
  private ZonedDateTime eventDate;

  @PrePersist
  protected void onCreate() {
    this.eventDate = ZonedDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
}
