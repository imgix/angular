import { NgModule } from '@angular/core';
import { ImgixConfigService } from './imgix-config.service';
import { IxImgComponent } from './ix-img.component';
import { IxPictureComponent } from './ix-picture.component';
import { IxSourceComponent } from './ix-source.component';
export class ImgixAngularModule {
    // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
    static forRoot(config) {
        return {
            ngModule: ImgixAngularModule,
            providers: [
                IxImgComponent,
                IxSourceComponent,
                IxPictureComponent,
                { provide: ImgixConfigService, useValue: config },
            ],
        };
    }
}
ImgixAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [IxImgComponent, IxSourceComponent, IxPictureComponent],
                exports: [IxImgComponent, IxSourceComponent, IxPictureComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1naXgtYW5ndWxhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ZyZWQvUHJvZ3JhbW1pbmcvaW1naXgvc2RrLW1vbm9yZXBvL2pzL3BhY2thZ2VzL25nLWltZ2l4L3Byb2plY3RzL2ltZ2l4LWFuZ3VsYXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2ltZ2l4LWFuZ3VsYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBZSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU0xRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLDRIQUE0SDtJQUM1SCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQW1CO1FBQ2hDLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxjQUFjO2dCQUNkLGlCQUFpQjtnQkFDakIsa0JBQWtCO2dCQUNsQixFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2FBQ2xEO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWhCRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO2dCQUNyRSxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUM7YUFDakUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1naXhDb25maWcsIEltZ2l4Q29uZmlnU2VydmljZSB9IGZyb20gJy4vaW1naXgtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXhJbWdDb21wb25lbnQgfSBmcm9tICcuL2l4LWltZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXhQaWN0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9peC1waWN0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJeFNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vaXgtc291cmNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0l4SW1nQ29tcG9uZW50LCBJeFNvdXJjZUNvbXBvbmVudCwgSXhQaWN0dXJlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0l4SW1nQ29tcG9uZW50LCBJeFNvdXJjZUNvbXBvbmVudCwgSXhQaWN0dXJlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgSW1naXhBbmd1bGFyTW9kdWxlIHtcbiAgLy8gVXNpbmcgY29uZmlnIGluamVjdGlvbiBwYXR0ZXJuIGZyb206IGh0dHBzOi8vbWVkaXVtLmNvbS9AbWljaGVsZXN0aWV2ZW4vYW5ndWxhci13cml0aW5nLWNvbmZpZ3VyYWJsZS1tb2R1bGVzLTY5ZTZlYTIzZWE0MlxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEltZ2l4Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxJbWdpeEFuZ3VsYXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEltZ2l4QW5ndWxhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBJeEltZ0NvbXBvbmVudCxcbiAgICAgICAgSXhTb3VyY2VDb21wb25lbnQsXG4gICAgICAgIEl4UGljdHVyZUNvbXBvbmVudCxcbiAgICAgICAgeyBwcm92aWRlOiBJbWdpeENvbmZpZ1NlcnZpY2UsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19