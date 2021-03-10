import { Component, Input } from '@angular/core';

// TODO #1311: define the map and keys near mapper or service
// TODO #1311: avoid special characters as keys
const energyLabelMap = {
  A: 'a',
  'A+': 'ap',
  'A++': 'app',
  'A++ - E': 'appe',
  'A+++': 'appp',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
};

// TODO #1311: rename to EfficiencyClass
// TODO #1311: have an enum/type/interface without dependency on the map. Depend the map on the enum instead.
export type EnergyLabel = keyof typeof energyLabelMap;

/**
 * Used to display Energy label in a flag.
 */
@Component({
  selector: 'app-energy-flag',
  templateUrl: './energy-flag.component.html',
  styleUrls: ['./energy-flag.component.scss'],
})
export class EnergyFlagComponent {
  /** Energy Efficiency Class */
  // TODO #1311: rename to efficiencyClass
  @Input() type: EnergyLabel;

  public get cssClass() {
    return energyLabelMap[this.type];
  }

  public get displayText() {
    return this.type === 'A++ - E' ? 'A+++' : this.type;
  }
}
