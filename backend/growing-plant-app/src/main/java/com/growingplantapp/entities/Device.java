package com.growingplantapp.entities;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    private String name;
    @ManyToOne
    private User user;
    private double Latitude;
    private double Longitude;
    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Plant> plants;
    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Weather> weathers;
    @ManyToOne
    private TypeDevice typeDevice;
    private boolean isActive;

    public Device() {
    }


    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public TypeDevice getTypeDevice() {
        return typeDevice;
    }

    public void setTypeDevice(TypeDevice typeDevice) {
        this.typeDevice = typeDevice;
    }

    public List<Weather> getWeathers() {
        return weathers;
    }

    public void setWeathers(List<Weather> weathers) {
        this.weathers = weathers;
    }

    public List<Plant> getPlants() {
        return plants;
    }

    public void setPlants(List<Plant> plant) {
        this.plants = plant;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getLatitude() {
        return Latitude;
    }

    public void setLatitude(double latitude) {
        Latitude = latitude;
    }

    public double getLongitude() {
        return Longitude;
    }

    public void setLongitude(double longitude) {
        Longitude = longitude;
    }
}
