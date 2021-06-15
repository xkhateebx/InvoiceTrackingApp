package com.invoicetrackingsystem.bean;

import java.util.List;

public class ImageReq {

    private String keyId;
    private List<ItemImageReq> items;

    public String getKeyId() {
        return keyId;
    }

    public void setKeyId(String keyId) {
        this.keyId = keyId;
    }

    public List<ItemImageReq> getItems() {
        return items;
    }

    public void setItems(List<ItemImageReq> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "ImageReq{" +
                "keyId='" + keyId + '\'' +
                ", items=" + items +
                '}';
    }

}