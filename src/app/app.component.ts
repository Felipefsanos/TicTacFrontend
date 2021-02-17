import { animate, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MenuFlatNode, MenuItem } from './shared/models/base/menu-item.model';
import { menuItems } from './shared/navigation/menu.model';

/** Flat node with expandable and level information */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Tic tac Admin';
  opened = true;
  userLoged = true;

  sideNavOpened = false;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  private transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: !!node.icon ? node.icon : '',
      url: node.url,
      level,
    };
  }

  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  // tslint:disable-next-line: member-ordering
  dataSourceMenu = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener<'change'>('change', this.mobileQueryListener);

    this.dataSourceMenu.data = menuItems;

    //TODO: Verificar se tem token válido.
    
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<'change'>('change', this.mobileQueryListener);
  }

  userLogged(event: boolean): void {
    this.userLoged = event;
  }
}
