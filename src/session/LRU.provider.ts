import { Provider } from './session'

class Node {
  timer: NodeJS.Timeout

  constructor(
    public key: string = '',
    public value: any = 0,
    public provider: Provider = null,
    public prev: Node = null,
    public next: Node = null
  ) {
    this.setDestruct()
  }

  setDestruct() {
    if(this.provider && this.provider.maxAge !== -1) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => this.destruct() , this.provider.maxAge * 1000)
    }
  }

  destruct() {
    console.log('destruct' , this.key)
    this.provider.garbageCollect(this.key)
  }
}

class LRUProvider implements Provider {
  head: Node = new Node()
  tail: Node = new Node()
  mapper: Map<string , Node> = new Map<string , Node> ()

  constructor(public capacity: number = 10 , public maxAge: number = -1) {
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(sid: string): any {
    if(this.mapper.has(sid)) {
      const node: Node = this.mapper.get(sid)
      node.setDestruct()
      this.moveToHead(node)
      return node.value
    } else return undefined
  }
  
  set(sid: string , value: any) {
    if(this.mapper.has(sid)) {
      const node: Node = this.mapper.get(sid)
      node.setDestruct()
      node.value = value
      this.moveToHead(node)
    }else {
      const node: Node = new Node(sid , value , this)
      this.addToHead(node)

      if(this.mapper.size > this.capacity) {
        this.removeTail()
      }
    }
  }

  garbageCollect(sid: string): void {
    if(!this.mapper.has(sid)) return 

    const node = this.mapper.get(sid)
    node.prev.next = node.next
    node.next.prev = node.prev

    this.mapper.delete(sid)
  }

  private addToHead(node: Node) {
    const { head , mapper } = this

    head.next.prev = node
    node.next = head.next
    node.prev = head
    head.next = node

    mapper.set(node.key , node)
  }

  private moveToHead(node: Node) {
    const { head } = this
    node.prev.next = node.next
    node.next.prev = node.prev

    node.next = head.next
    head.next.prev = node
    node.prev = head
    head.next = node
  }

  private removeTail() {
    const node: Node = this.tail.prev
    if(node === this.head) return

    node.prev.next = node.next
    node.next.prev = node.prev

    this.mapper.delete(node.key)
  }

}

export default LRUProvider