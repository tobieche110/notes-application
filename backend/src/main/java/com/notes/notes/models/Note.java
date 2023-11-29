package com.notes.notes.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "notes")
@ToString @EqualsAndHashCode
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    @Column(name = "id")
    private Long id;

    @Getter @Setter
    @Column(name = "note")
    private String note;

    @Getter @Setter
    @Column(name = "category")
    private String category;

    @Getter @Setter
    @Column(name = "is_archived")
    private Boolean isArchived;
}
