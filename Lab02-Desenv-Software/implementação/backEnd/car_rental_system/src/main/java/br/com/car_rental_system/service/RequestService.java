package br.com.car_rental_system.service;

import br.com.car_rental_system.entity.PurchaseContract;
import br.com.car_rental_system.repository.RequestRepository;

// import br.com.car_rental_system.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public List<PurchaseContract> getAllDocuments() {
        return requestRepository.findAll();
    }

    public PurchaseContract getDocumentById(Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    public PurchaseContract saveDocument(PurchaseContract document) {
        return requestRepository.save(document);
    }

    public void deleteDocument(Long id) {
        requestRepository.deleteById(id);
    }
}
