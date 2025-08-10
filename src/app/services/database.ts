import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class Database {

  private readonly DB_FILE_PATH = 'database/db.ts';
  private readonly DB_FOLDER = 'database';

  constructor() {}

  /**
   * Salva os dados importados criando/atualizando o arquivo db.ts
   */
  async saveImportedData(newOrders: Order[]): Promise<boolean> {
    try {
      // Buscar dados existentes
      const existingOrders = await this.loadExistingData();

      // Combinar dados existentes com novos (evitando duplicatas por idClientProduct)
      const combinedOrders = this.mergeOrders(existingOrders, newOrders);

      // Gerar conteúdo do arquivo
      const fileContent = this.generateDbFileContent(combinedOrders);

      // Salvar arquivo (simulação - em ambiente real seria necessário um backend)
      await this.saveToFile(fileContent);

      console.log(`✅ Dados salvos com sucesso! Total de registros: ${combinedOrders.length}`);
      return true;

    } catch (error) {
      console.error('❌ Erro ao salvar dados:', error);
      return false;
    }
  }

  /**
   * Carrega dados existentes do arquivo db.ts
   */
  private async loadExistingData(): Promise<Order[]> {
    try {
      // Em um ambiente real, isso faria uma requisição para ler o arquivo
      // Por enquanto, vamos simular retornando array vazio
      // TODO: Implementar leitura real do arquivo quando houver backend
      return [];
    } catch (error) {
      console.log('📁 Arquivo db.ts não encontrado ou vazio, criando novo...');
      return [];
    }
  }

  /**
   * Combina orders existentes com novas, evitando duplicatas
   */
  private mergeOrders(existing: Order[], newOrders: Order[]): Order[] {
    const existingIds = new Set(existing.map(order => order.idClientProduct));

    // Filtrar apenas orders que não existem
    const uniqueNewOrders = newOrders.filter(order => !existingIds.has(order.idClientProduct));

    // Combinar todos
    const combined = [...existing, ...uniqueNewOrders];

    console.log(`📊 Dados existentes: ${existing.length}, Novos únicos: ${uniqueNewOrders.length}, Total: ${combined.length}`);

    return combined;
  }

  /**
   * Gera o conteúdo do arquivo db.ts
   */
  private generateDbFileContent(orders: Order[]): string {
    const timestamp = new Date().toISOString();

    return `// Arquivo gerado automaticamente em ${timestamp}
// Sistema Order - Base de dados local
import { Order } from '../src/app/interfaces/order.interface';

export const DATABASE_ORDERS: Order[] = ${JSON.stringify(orders, null, 2)};

export const DATABASE_INFO = {
  lastUpdate: '${timestamp}',
  totalRecords: ${orders.length},
  version: '1.0.0'
};

// Função para buscar todas as orders
export function getAllOrders(): Order[] {
  return DATABASE_ORDERS;
}

// Função para buscar order por ID
export function getOrderById(idClientProduct: string): Order | undefined {
  return DATABASE_ORDERS.find(order => order.idClientProduct === idClientProduct);
}

// Função para filtrar orders
export function filterOrders(filterFn: (order: Order) => boolean): Order[] {
  return DATABASE_ORDERS.filter(filterFn);
}
`;
  }

  /**
   * Simula salvamento do arquivo
   * TODO: Implementar salvamento real quando houver backend
   */
  private async saveToFile(content: string): Promise<void> {
    // Em ambiente de desenvolvimento, vamos log o conteúdo
    console.log('📝 Conteúdo do arquivo db.ts que seria salvo:');
    console.log('=====================================');
    console.log(content);
    console.log('=====================================');

    // Em produção, isso faria uma requisição POST para o backend salvar o arquivo
    // Por enquanto, vamos salvar no localStorage como fallback
    localStorage.setItem('order-database', content);

    // Simular delay de salvamento
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * Método para download manual do arquivo db.ts
   */
  downloadDbFile(orders: Order[]): void {
    const content = this.generateDbFileContent(orders);
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'db.ts';
    link.click();

    URL.revokeObjectURL(url);
    console.log('📥 Arquivo db.ts baixado com sucesso!');
  }

  /**
   * Carrega dados do localStorage (fallback)
   */
  loadFromLocalStorage(): Order[] {
    try {
      const content = localStorage.getItem('order-database');
      if (content) {
        // Extrair array de orders do conteúdo do arquivo
        const match = content.match(/export const DATABASE_ORDERS: Order\[\] = (.*?);/s);
        if (match) {
          return JSON.parse(match[1]);
        }
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      return [];
    }
  }
}
