---
title: leetcode之链表专题
date: '2020-11-13'
type: 技术
tags: 算法
note: leetcode之链表专题
---
## 例题 1 [奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/)
给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
请尝试使用原地算法完成。你的算法的空间复杂度应为 `O(1)`，时间复杂度应为 `O(nodes)`，`nodes` 为节点总数。
**示例 1:**

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
**示例 2:**
输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
说明:

应当保持奇数节点和偶数节点的相对顺序。
链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推
```js
//链表类
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
//根据数组创建链表
function createListNode(arr){
    const root=new ListNode()
    arr.reduce((node,val)=>{
        node.next=new ListNode(val);
        return node.next;
    },root)
    return root.next;
}
var oddEvenList = function(head) {
    if (head === null) {
         return head;
     }
     let evenHead = head.next;
     //head指向奇数位的节点 evenHead指向偶数位的节点
     let odd = head, even = evenHead;
     while (even !== null && even.next !== null) {
         odd.next = even.next;
         odd = odd.next;
         even.next = odd.next;
         even = even.next;
     }
     odd.next = evenHead;
     return head;
 };
 const root=createListNode([1,2,3,4,5])
 oddEvenList(root)
```

