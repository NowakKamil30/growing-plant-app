package com.growingplantapp.services.interfaces;

import java.util.Map;

public interface ExtendCRUDService<ITEM, ID> extends CRUDService<ITEM, ID>{
    void patch(ID id, Map<String, Object> updates);
}
