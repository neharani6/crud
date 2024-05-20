import { Component, OnInit } from '@angular/core';
import data from '../../data/users.json';
import { User } from './user.interface';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  users: User[] = [];
  email: any;
  gender: any;
  name: any;
  selectedUser: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.users = data;
    console.log(this.users);
    console.log(data);
    // console.log(data.email);


  }

  deleteUser(selectedUserId: any) {
    const index = this.users.findIndex((x) => x.id == selectedUserId);
    this.users.splice(index, 1);
  }



  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
  }

  close(closeModal: any) {
    this.setAllValues();
    closeModal.dismiss('Cross click');
  }

  setAllValues() {
    this.email = '';
    this.name = '';
    this.gender = '';
    this.selectedUser = null;
  }

  addStudent(values: any) {
    const size = this.users?.length - 1;
    values.id = this.users[size]?.id + 1;
    this.users.push(values);
    this.setAllValues();
  }

  editUser(selectedUser: any, content: any) {
    this.selectedUser = selectedUser;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.email = selectedUser?.email;
    this.name = selectedUser?.name;
    this.gender = selectedUser?.gender;
  }

  updateStudentInTable(values: any) {
    this.users.forEach((x) => {
      if (x.id == this.selectedUser.id) {
        x.name = values.name;
        x.email = values.email;
        x.gender = values.gender;
      }
    });
    this.setAllValues();
  }
  
  onSubmit(f: NgForm) {
    const formValues = f?.value;
    if (this.selectedUser) {
      this.updateStudentInTable(formValues);
    } else {
      this.addStudent(formValues);
    }
    this.modalService.dismissAll(); 
  }
}
