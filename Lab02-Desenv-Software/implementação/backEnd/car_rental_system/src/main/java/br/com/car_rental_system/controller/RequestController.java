package br.com.car_rental_system.controller;


@RestController
@RequestMapping("/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<Request> criarRequest(@RequestBody Request request) {
        Request newRequest = requestService.criarRequest(request);
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/solicitar-compra")
    public ResponseEntity<Request> solicitarCompra(@PathVariable Long id) {
        Request requestAtualizado = requestService.solicitarCompra(id);
        return ResponseEntity.ok(requestAtualizado);
    }

    @PutMapping("/{id}/solicitar-seguro")
    public ResponseEntity<Request> solicitarSeguro(@PathVariable Long id) {
        Request requestAtualizado = requestService.solicitarSeguro(id);
        return ResponseEntity.ok(requestAtualizado);
    }
}

