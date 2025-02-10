import { Component, OnInit, TemplateRef } from '@angular/core';
import { ElasticsearchService } from './service/elasticsearch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dataSource: any[] = [];
  data_skill: any[] = [];
  data_experience: any[] = [];
  data_education: any[] = [];
  data_certification: any[] = [];
  searchTerm: string = "";
  selectedResult: any;

  constructor(private modalService: NgbModal,private esService: ElasticsearchService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const indexName = 'cvvision'; // Replace with your index name

    this.esService.getCv(indexName, this.searchTerm).subscribe({
      next: (response) => {
        this.dataSource = response.hits.hits;
        console.log(`All data from index "${indexName}":`, this.dataSource);
      },
      error: (error) => {
        console.error(`Error fetching data from index "${indexName}":`, error);
      },
    });
  }

  search() {
    this.loadData()
  }

  open(content: TemplateRef<any>, result: any) {
    this.selectedResult = result;
    this.data_experience = result.work_experience
    this.data_skill = result.skills
    this.data_certification = result.certification
    this.data_education = result.education
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', backdrop: false }).result
  }
}