package com.growingplantapp.builders;

import com.growingplantapp.entities.*;

import java.util.List;

public final class DeviceBuilder {
    private Long id;
    private String name;
    private User user;
    private double Latitude;
    private double Longitude;
    private List<Plant> plant;
    private List<Weather> weathers;
    private TypeDevice typeDevice;

    private DeviceBuilder() {
    }

    public static DeviceBuilder aDevice() {
        return new DeviceBuilder();
    }

    public DeviceBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public DeviceBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public DeviceBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public DeviceBuilder withLatitude(double Latitude) {
        this.Latitude = Latitude;
        return this;
    }

    public DeviceBuilder withLongitude(double Longitude) {
        this.Longitude = Longitude;
        return this;
    }

    public DeviceBuilder withPlant(List<Plant> plant) {
        this.plant = plant;
        return this;
    }

    public DeviceBuilder withWeathers(List<Weather> weathers) {
        this.weathers = weathers;
        return this;
    }

    public DeviceBuilder withTypeDevice(TypeDevice typeDevice) {
        this.typeDevice = typeDevice;
        return this;
    }

    public Device build() {
        Device device = new Device();
        device.setId(id);
        device.setName(name);
        device.setUser(user);
        device.setLatitude(Latitude);
        device.setLongitude(Longitude);
        device.setPlant(plant);
        device.setWeathers(weathers);
        device.setTypeDevice(typeDevice);
        return device;
    }
}
