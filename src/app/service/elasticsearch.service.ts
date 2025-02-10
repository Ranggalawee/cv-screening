import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  private elasticUrl = 'http://localhost:9200'; // Replace with your Elasticsearch URL

  constructor(private http: HttpClient) {}

  // Fetch all data from a specific index
  getCv(indexName: string, searchTerm: string = ''): Observable<any> {
    const query = searchTerm.trim()
      ? {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: searchTerm,
                  fields: [
                    "work_experience.job_title",
                    "work_experience.company",
                    "work_experience.location",
                    "skills.title",
                    "skills.description",
                    "skills.level"
                  ],
                  "fuzziness": "AUTO"
                }
              }
            ]
          }
        }
      }
    : {
        query: {
          match_all: {}
        },
        size: 20
      };
  
    return this.http.post(`${this.elasticUrl}/${indexName}/_search`, query);
  }
  

  searchData(indexName: string, searchTerm: string): Observable<any> {
    return this.http.post(`${this.elasticUrl}/${indexName}/_search`, {
      query: {
        bool: {
          should: [
            {
              nested: {
                path: "work_experience",
                query: {
                  multi_match: {
                    query: searchTerm,
                    fields: [
                      "work_experience.job_title",
                      "work_experience.company",
                      "work_experience.location",
                      "work_experience.job_description"
                    ]
                  }
                }
              }
            },
            {
              nested: {
                path: "skills",
                query: {
                  multi_match: {
                    query: searchTerm,
                    fields: [
                      "skills.title",
                      "skills.description",
                      "skills.level"
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    });
  }
}
