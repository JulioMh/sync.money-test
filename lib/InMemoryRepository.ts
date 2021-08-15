import { EntityNotFound } from "./EntityNotFound";

interface QueryParam {
  key: string;
  value: any;
}

export class InMemoryRepository {
  private _repo: Array<any>;

  constructor() {
    this._repo = [];
  }

  async findById(id: number): Promise<any> {
    const item = this._repo.find((item) => item.id === id);
    if (!item) throw new EntityNotFound(`Id: ${id} not found`);
    return Promise.resolve(item);
  }

  async findBy(...queries: QueryParam[]): Promise<Array<any>> {
    const items = this._repo.reduce((allMatches, item) => {
      const matches = [];
      for (const query of queries) {
        if (item[query.key] === query.value) {
          matches.push(item);
        }
      }
      return [...allMatches, ...matches];
    }, []);

    return items;
  }

  async save(item: any): Promise<number> {
    if (item.id) throw new Error(`Id will be generated`);
    const latestId = this._repo.reduce(
      (acc, item) => (item.id > acc ? item.id : acc),
      0
    );
    const newId = latestId + 1;
    const itemWithId = {
      id: newId,
      ...item,
    };

    this._repo = [...this._repo, itemWithId];

    return Promise.resolve(newId);
  }

  async update(item: any): Promise<any> {
    const { id } = item;
    const index = this._repo.findIndex((item) => item.id === id);
    if (index === -1) throw new EntityNotFound(`Id: ${id} not found`);
    const editedItem = {
      ...this._repo[index],
      ...item,
    };
    this._repo = [
      ...this._repo.slice(0, index),
      editedItem,
      ...this._repo.slice(index + 1),
    ];

    return Promise.resolve(editedItem);
  }
}
