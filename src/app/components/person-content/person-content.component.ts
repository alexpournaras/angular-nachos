import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { Person } from '../../person';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'person-content',
  templateUrl: './person-content.component.html',
  styleUrls: ['./person-content.component.css']
})
export class PersonContentComponent implements OnInit {
  youtubeVideo: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  personId: string | null = '';
  person: Person = {
    id: '',
    bio: '',
    imageUrl: '',
    name: '',
    role: ''
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      this.updatePersonContent();
    });
  }

  async updatePersonContent() {
    const people = await this.apiService.getPeople();
    const person = people.find(person => person.id === this.personId);
    if (person) this.person = person;
    this.getYoutubeVideo(person?.role + '' + person?.name).subscribe(data => {
      const video = data.items[0];
      this.youtubeVideo = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId);
    });
  }

  getYoutubeVideo(searchTerm: string): Observable<any> {
    return this.http.get<any>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${environment.YOUTUBE_API_KEY}`
    );
  }
}
