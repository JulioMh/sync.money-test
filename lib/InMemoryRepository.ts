import { EntityNotFound } from './EntityNotFound'

export class InMemoryRepository {

  private repo: Array<any>;

  constructor() {
    this.repo = [];
  }

  async findById(id: number): Promise<any> {
    const item = this.repo.find(item => item.id === id);
    if(!item) throw new EntityNotFound(`Id: ${id} not found`)
    return Promise.resolve(item);
  }

  async getAll(): Promise<Array<any>> {
    return Promise.resolve(this.repo);
  }

  async save(item: any): Promise<number> {
    if (item.id) throw new Error(`Id will be generated`)
    const latestId = this.repo.reduce((acc, id) => id > acc ? id : acc, 0)
    const newId = latestId + 1
    const itemWithId = {
      id: newId,
      ...item
    }
    
    this.repo = [
      ...this.repo,
      itemWithId
    ]

    return Promise.resolve(newId)
  }

  async update(item: any): Promise<any> {
    const { id } = item
    const index = this.repo.find(item => item.id === id);
    if(!index) throw new EntityNotFound(`Id: ${id} not found`)
    const editedItem = {
      ...this.repo[index],
      item
    }

    this.repo = [
      ...this.repo.slice(0, index),
      editedItem,
      ...this.repo.slice(index + 1)
    ];
  }
}