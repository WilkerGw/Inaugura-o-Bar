// src/app/components/Booking.tsx
"use client";

import { useState } from 'react';
import styles from './Booking.module.css';

// Estrutura de dados para as mesas
const tableOptions = {
  térreo: [
    { capacity: 2, price: 200 },
    { capacity: 4, price: 400 },
    { capacity: 8, price: 800 },
  ],
  rooftop: [
    { capacity: 2, price: 400 },
    { capacity: 4, price: 800 },
    { capacity: 8, price: 1800 },
  ],
  lounge: [
    { capacity: 5, price: 1500 },
    { capacity: 10, price: 3000 },
  ],
};

const Booking = () => {
  const [selectedArea, setSelectedArea] = useState<keyof typeof tableOptions>('térreo');
  const [selectedTable, setSelectedTable] = useState(tableOptions.térreo[0]);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Função para limpar todos os campos do formulário
  const clearForm = () => {
    setSelectedArea('térreo');
    setSelectedTable(tableOptions.térreo[0]);
    setReservationDate('');
    setReservationTime('');
    setCustomerName('');
    setCustomerPhone('');
  };

  const handleAreaChange = (area: keyof typeof tableOptions) => {
    setSelectedArea(area);
    setSelectedTable(tableOptions[area][0]); 
  };
  
  // Função para aplicar a máscara de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Coloca hífen depois do quinto dígito
    setCustomerPhone(value);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simula o envio dos dados
    alert(`Reserva para ${customerName} confirmada!\nÁrea: ${selectedArea}\nMesa para ${selectedTable.capacity} pessoas\nData: ${reservationDate} às ${reservationTime}\nValor: R$ ${selectedTable.price}`);
    
    // Limpa o formulário após a confirmação
    clearForm();
  };

  return (
    <div className={styles.bookingContainer}>
      <h2>Faça sua Reserva</h2>
      <form className={styles.bookingForm} onSubmit={handleFormSubmit}>
        
        {/* Seleção de Área */}
        <div className={styles.areaSelector}>
          {Object.keys(tableOptions).map((area) => (
            <button
              key={area}
              type="button"
              className={`${styles.areaButton} ${selectedArea === area ? styles.active : ''}`}
              onClick={() => handleAreaChange(area as keyof typeof tableOptions)}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Seleção de Mesa */}
        <div className={styles.formGroup}>
          <label htmlFor="table-select">Tipo de Mesa:</label>
          <select 
            id="table-select" 
            className={styles.formInput} 
            value={JSON.stringify(selectedTable)}
            onChange={(e) => setSelectedTable(JSON.parse(e.target.value))}
          >
            {tableOptions[selectedArea].map((table) => (
              <option key={table.capacity} value={JSON.stringify(table)}>
                Mesa para {table.capacity} pessoas - R$ {table.price},00
              </option>
            ))}
          </select>
        </div>

        {/* Seleção de Data e Hora */}
        <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label htmlFor="date">Data:</label>
                <input 
                    type="date" 
                    id="date" 
                    className={styles.formInput}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    required 
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="time">Hora:</label>
                <input 
                    type="time" 
                    id="time" 
                    className={styles.formInput}
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    required 
                />
            </div>
        </div>

        {/* Dados Pessoais */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome Completo:</label>
          <input 
            type="text" 
            id="name" 
            className={styles.formInput}
            placeholder="Seu nome"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone para Contato:</label>
          <input 
            type="tel" 
            id="phone" 
            className={styles.formInput}
            placeholder="(11) 99999-9999"
            value={customerPhone}
            onChange={handlePhoneChange} // Usa a nova função com máscara
            maxLength={15} // Limita o tamanho do campo (ex: (11) 99999-9999)
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Confirmar Reserva</button>
      </form>
    </div>
  );
};

export default Booking;