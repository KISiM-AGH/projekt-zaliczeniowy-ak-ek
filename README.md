todo :
1. query do SQL # done
2. grafika sudoku # done
3. generator sudoku # done
4. routing # done
5. sprawdzanie sudoku po stronie serwera # done
6. logowanie JWT # done

7. readme - aga
8. uzupełnienie kodu - emil




# Generator sudoku
// nie wiem co tu napisać żeby nie było tak pusto xd

Aplikacja przeglądarkowa napisana przez Emila Kobyłeckiego i Agnieszkę Kowalczyk w ramach zaliczenia przedmiotu Inżyniera Internetu.

## 1. Ogólny opis aplikacji

Aplikacja służy do generoanwia sudoku. Na odpowiednie żadanie użytkownika, wyświetlana jest tablica sudoku z brakującymi polami do uzupełnienia, przedstawiona w czytelny sposób w przeglądarce:

```
Sudoku to solve

| _ 4 _ | 7 9 5 | _ 2 3 |
| _ 3 2 | 4 _ 8 | 9 _ 5 |
| 5 _ 9 | 3 _ _ | _ 4 1 |

| 4 5 _ | _ 8 6 | 7 3 _ |
| 9 6 _ | _ 4 _ | _ _ 2 |
| _ 2 _ | _ 3 1 | _ _ 4 |

| 3 9 _ | _ _ 4 | 2 _ 8 |
| _ _ _ | _ _ 3 | _ 9 _ |
| 2 _ _ | 6 5 9 | _ 1 _ |
```

Jest możliwość wyboru jednego spośród trzech poziomów trudności łamigłówki- łatwego, średniego lub trudnego. Ponadto aplikacja oferuje możliwość założenia konta użytkowanika, który po rejestracji uzyskuje możliwość zapisywania wyników czy przeglądania archiwalnych. Konto użytkownika jest w pełni obsłużone- można się na nie powrtównie zalogować, wyświetlać oraz edytować wprowadzone dane czy trwale usunąć założone konto.

## 2. Wykorzystane technologie i narzędzia

Aplikacja została napisana zgodnie z założeniami API Rest oraz zaimplementowana w języku JavaScript. Zarządzaniem wszelikmi zależnościami w projekcie zajął się menadżer pakietów- Yarn, natomiast narzędziem zapewaniającym przenośność kodu pomiędzy rożnymi platformami i odpowiednio przetwarzającym zmienne środowiskowe był cross-env. Wykorzystano bazę danych MySQL umieszczoną na lokalnym serwerze uruchamianą przy pomocy pakietu XAMPP. Dla łatwiejszej obsługi bazy danych w kodzie, wykorzystano narzędzie wspierające budowanie zapytań oraz migracji- Knex. Wsparciem przy rzutowaniu obiektów obsługiwanych przez program na relacyjną bazę danych był Objection.js- odpowiadał za mapowanie obiektowo- realcyjne. Ważnym elementem umożliwającym logowanie użytkownika oraz przetwarzanie różnych rządań pochodzących od jednego klienta był JWT- Json Web Token. Bezpieczne haszowanie haseł wprowadzanych do bazy danych zrealizowano dzięki algorytmowi Agron2.

## 3. Funkcjonalności

