import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface AppState {
  user: User | null;
  isLoading: boolean;
  currentPage: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly _state = signal<AppState>({
    user: null,
    isLoading: false,
    currentPage: 'home'
  });

  // Read-only computed signals for state access
  readonly state = this._state.asReadonly();
  readonly user = computed(() => this._state().user);
  readonly isAuthenticated = computed(() => !!this._state().user?.isAuthenticated);
  readonly isLoading = computed(() => this._state().isLoading);
  readonly currentPage = computed(() => this._state().currentPage);

  setUser(user: User | null): void {
    this._state.update(state => ({
      ...state,
      user
    }));
  }

  setLoading(isLoading: boolean): void {
    this._state.update(state => ({
      ...state,
      isLoading
    }));
  }

  setCurrentPage(page: string): void {
    this._state.update(state => ({
      ...state,
      currentPage: page
    }));
  }

  login(username: string, email: string): void {
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      isAuthenticated: true
    };
    this.setUser(user);
  }

  logout(): void {
    this.setUser(null);
  }
}