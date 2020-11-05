package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.TypeDevice;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class TypeDeviceDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String name;
    @JsonView(Views.Public.class)
    private BigDecimal price;
    @JsonView(Views.Private.class)
    private List<Long> devicesId;

    public TypeDeviceDTO()
    {

    }
    public TypeDeviceDTO(TypeDevice typeDevice)
    {
        this.id = typeDevice.getId();
        this.name = typeDevice.getName();
        this.price = typeDevice.getPrice();
        this.devicesId = typeDevice
                .getDevices()
                .stream()
                .map(Device::getId)
                .collect(Collectors.toList());

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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<Long> getDevicesId() {
        return devicesId;
    }

    public void setDevicesId(List<Long> devicesId) {
        this.devicesId = devicesId;
    }
}
