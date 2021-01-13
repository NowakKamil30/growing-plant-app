package com.growingplantapp.services;

import com.growingplantapp.entities.Device;
import com.growingplantapp.repositories.DeviceRepository;
import com.growingplantapp.services.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService implements CRUDService<Device, Long> {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }


    @Override
    public Optional<Device> getById(Long aLong) {
        return deviceRepository.findById(aLong);
    }

    @Override
    public List<Device> getAll() {
        return deviceRepository.findAll();
    }

    @Override
    public void add(Device device) {
        deviceRepository.save(device);
    }

    @Override
    public void deleteById(Long aLong) {
        deviceRepository.deleteById(aLong);
    }

    @Override
    public void update(Long aLong, Device device) {
        device.setId(aLong);
        deviceRepository.save(device);
    }
}
