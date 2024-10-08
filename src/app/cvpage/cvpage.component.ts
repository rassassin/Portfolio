import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CVInformationService } from '../cvinformation.service';

@Component({
  selector: 'app-cvpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cvpage.component.html',
  styleUrl: './cvpage.component.css',
})
export class CvpageComponent {
  CVInformation$: Observable<Array<any>> = of([]);
  error: any;
  constructor(private CVInformationService: CVInformationService) {}

  ngOnInit() {
    this.CVInformationService.getCVInformation().subscribe(
      (CVInformation) => {
        const localData = JSON.parse(JSON.stringify(CVInformation));
        for (let i = 0; i < localData.length; i++) {
          localData[i].roleDetails = localData[i].roleDetails.split('#');
        }
        console.log(localData);
        this.CVInformation$ = of(localData);
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
