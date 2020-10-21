package com.growingplantapp.services.interfaces;

import java.util.List;
import java.util.Optional;


public interface CRUDService<ITEM, ID> {
    Optional<ITEM> getById(ID id);
    List<ITEM> getAll();
    void add(ITEM item);
    void deleteById(ID id);
    void update(ID id, ITEM item);
}
