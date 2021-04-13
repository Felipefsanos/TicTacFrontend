import { LoadingService } from './../../shared/services/loading.service';
import { OrcamentoModel } from './../../models/orcamento.model';
import { OrcamentoService } from './../../services/orcamento.service';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay, startOfMonth } from 'date-fns';
import { Observable, of, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  calendarView = CalendarView;

  viewDate = new Date();

  refresh: Subject<any> = new Subject();

  events$: Observable<CalendarEvent<any>[]> = of([]);

  activeDayIsOpen = true;

  constructor(private orcamentoService: OrcamentoService,
    private loadingService: LoadingService) {
  }

  ngAfterViewInit(): void {
    this.obterEventos();
  }

  obterEventos(): void {
    this.events$ = this.orcamentoService.obterOrcamentos(subDays(startOfMonth(new Date()), 6), addDays(endOfMonth(new Date()), 6), true)
      .pipe(
        map(orcamentos => orcamentos.map(orcamento => ({
          title: `Orçamento de : ${orcamento.cliente?.nome}`,
          start: new Date(orcamento.dataEvento),
          color: colors.yellow,
          allDay: true,
        })))
      );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(event: CalendarEvent): void {
  //   debugger;
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: event.title,
  //       start: event.start,
  //       end: event.end,
  //       color: event.color,
  //       allDay: event.allDay
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
