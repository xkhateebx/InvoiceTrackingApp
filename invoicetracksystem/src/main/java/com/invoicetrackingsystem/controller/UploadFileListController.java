package com.invoicetrackingsystem.controller;

import com.invoicetrackingsystem.bean.ImageBean;
import com.invoicetrackingsystem.bean.ImageReq;
import com.invoicetrackingsystem.bean.ItemImageReq;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/uploadFileList")
public class UploadFileListController {

    final static Logger log = LogManager.getLogger(UploadFileListController.class);


    @ResponseBody
    @PostMapping(value = "form")
    public List<ImageBean> uploadSaveToFolder(@ModelAttribute ImageReq reqs) {
        log.info("Method uploadSaveToFolder of Class UploadFileListController: start.");
        List<ImageBean> list = new ArrayList<>();

        if (reqs != null) {
            log.info("KeyId: {}", reqs.getKeyId());
            if (reqs.getItems() != null) {
                log.info("Request item size: {}", reqs.getItems().size());
                if (!reqs.getItems().isEmpty()) {
                    for (ItemImageReq item : reqs.getItems()) {
                        ImageBean img = new ImageBean();
                        if (!item.getFile().isEmpty()) {
                            String filename = StringUtils.cleanPath(Objects.requireNonNull(item.getFile().getOriginalFilename()));
                            img.setName(filename);
                            img.setUrl("TODO: url.");
                            list.add(img);
                        }
                    }
                }
            }
        }
        return list;
    }

}