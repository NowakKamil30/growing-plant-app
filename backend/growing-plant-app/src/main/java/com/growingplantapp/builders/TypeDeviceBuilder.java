package com.growingplantapp.builders;

import com.growingplantapp.entities.TypeDevice;

import java.math.BigDecimal;

public final class TypeDeviceBuilder {
    private Long id;
    private String name;
    private BigDecimal price;

    private TypeDeviceBuilder() {
    }

    public static TypeDeviceBuilder aTypeDevice() {
        return new TypeDeviceBuilder();
    }

    public TypeDeviceBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public TypeDeviceBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public TypeDeviceBuilder withPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public TypeDevice build() {
        TypeDevice typeDevice = new TypeDevice();
        typeDevice.setId(id);
        typeDevice.setName(name);
        typeDevice.setPrice(price);
        return typeDevice;
    }
}
