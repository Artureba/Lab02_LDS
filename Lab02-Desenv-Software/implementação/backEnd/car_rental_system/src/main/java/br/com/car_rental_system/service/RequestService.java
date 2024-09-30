package br.com.car_rental_system.service;

import br.com.car_rental_system.entity.Document;
import br.com.car_rental_system.repository.RequestRepository;

// import br.com.car_rental_system.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public List<Document> getAllDocuments() {
        return requestRepository.findAll();
    }

    public Document getDocumentById(Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    public Document saveDocument(Document document) {
        return requestRepository.save(document);
    }

    public void deleteDocument(Long id) {
        requestRepository.deleteById(id);
    }
}
