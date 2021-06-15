package com.invoicetrackingsystem.controller;

import com.invoicetrackingsystem.bean.ImageBean;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/uploadfile")
public class UploadFileController {

    final static Logger log = LogManager.getLogger(UploadFileController.class);
    final static String UPLOADED_FOLDER = "images"; // folder target upload


    @PostMapping(value = "form1")
    @ResponseBody
    public ImageBean uploadSaveToFolder(@RequestParam("file") MultipartFile file) {
        ImageBean image = new ImageBean();

        if (file == null) {
            log.warn("Please select a file to upload");
            return image;
        }

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        Path rootLocation = Paths.get(UPLOADED_FOLDER);

        try {
            if (file.isEmpty()) {
                log.error("Failed to store empty file " + filename);
                return image;
            }

            if (filename.contains("..")) {
                // This is a security check
                log.error("Cannot store file with relative path outside current directory " + filename);
                return image;
            }

            try (InputStream inputStream = file.getInputStream()) {
                Path pathFile = rootLocation.resolve(filename);

                // save file to target(server)
                Files.copy(inputStream, pathFile, StandardCopyOption.REPLACE_EXISTING);

                // read file to bytes
                // Files.readAllBytes(pathFile);

                image.setName(filename);
                image.setUrl(pathFile.toString());
                log.info("You successfully uploaded '" + filename + "'");
            }
        } catch (IOException e) {
            log.error("Failed to store file " + filename, e);
        }

        return image;
    }

    /**
     * http://localhost:8080/uploadfile/test
     */
    @GetMapping("test")
    @ResponseBody
    public String test() {
        return "Hello World.";
    }
}