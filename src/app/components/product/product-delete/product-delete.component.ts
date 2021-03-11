import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Product } from '../product.model';
/*export interface DialogData {
  name: string;
  id: string;
} PARTE COMENTADA É A MESMA AÇÃO UTILIZANDO DIALOG*/

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: any;
  productId: string = '';

  constructor(//public dialog: MatDialog,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.productService.readById(this.productId).subscribe(product => {
      this.product = product;
      /*const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        data: { name: this.product.name , id: this.product.id}
      });*/
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Produto '"+ this.product.name + "' foi excluido com sucesso!");
      this.router.navigate(['/products']);
    })
  }

  cancel() {
    this.router.navigate(['/products']);
  }

}

/*@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./product-delete.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(private productService: ProductService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/products']);
  }

  deleteProduct(): void {
    this.productService.delete(this.data.id).subscribe(() => {
      this.productService.showMessage("Produto ' " + this.data.name + " ' foi deletado com sucesso!");
      this.dialogRef.close();
      this.router.navigate(['/products']);
    })
  }

}

*/