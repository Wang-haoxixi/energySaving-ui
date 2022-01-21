class CommonData {
  public id: number;
  public name: string;
  public avatar: string;

  constructor($id: number, $name: string, $avatar: string) {
    this.id = $id;
    this.name = $name;
    this.avatar = $avatar;
  }
}

interface Page {
  current: number
  orders: any[]
  pages: number
  records: any[]
  searchCount: boolean
  size: number
  total: number
}
export { CommonData, Page };
