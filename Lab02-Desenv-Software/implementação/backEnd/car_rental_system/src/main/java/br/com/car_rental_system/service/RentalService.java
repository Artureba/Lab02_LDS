// package br.com.car_rental_system.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class RequestService {
//  @Autowired
//     private RequestRepository requestRepository;

//     public Request criarRequest(Request request) {
//         return requestRepository.save(request);
//     }
    
//     public Request solicitarCompra(Long id) {
//         Request request = requestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Request não encontrado"));
//         request.setCompraSolicitada(true);
//         return requestRepository.save(request);
//     }

//     public Request solicitarSeguro(Long id) {
//         Request request = requestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Request não encontrado"));
//         request.setSolicitacaoSeguro(true);
//         return requestRepository.save(request);
//     }
// }
