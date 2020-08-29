import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// * Servicio
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent implements OnInit {
  artista: any = {};
  loadingArtist: boolean;
  topTracks: any[] = [];
  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe((params) => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  getArtista(id: string): void {
    if (id) {
      this.loadingArtist = true;
      this.spotify.getArtista(id).subscribe((artista) => {
        this.artista = artista;
        this.loadingArtist = false;
      });
    }
  }

  getTopTracks(id: string): void {
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      this.topTracks = topTracks;
    });
  }

  ngOnInit(): void {}
}
