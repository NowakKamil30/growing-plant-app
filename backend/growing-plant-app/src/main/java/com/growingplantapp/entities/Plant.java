package com.growingplantapp.entities;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    private String name;
    @ManyToOne
    private Device device;
    @ManyToOne
    private GrowingCondition growingCondition;

    public Plant() {
    }

    public GrowingCondition getGrowingCondition() {
        return growingCondition;
    }

    public void setGrowingCondition(GrowingCondition growingCondition) {
        this.growingCondition = growingCondition;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }
}
