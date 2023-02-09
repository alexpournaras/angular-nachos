import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CookieComponent } from './layout/cookie/cookie.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturedMoviesComponent } from './components/featured-movies/featured-movies.component';
import { LatestPopularComponent } from './components/latest-popular/latest-popular.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { PopularActorsComponent } from './components/popular-actors/popular-actors.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesPageComponent },
  // { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CookieComponent,
    SliderComponent,
    FeaturedMoviesComponent,
    LatestPopularComponent,
    PopularMoviesComponent,
    PopularActorsComponent,
    MoviesPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
