// enum for wheelchair boarding
export enum WheelchairBoarding {
  UNKNOWN = 0, // Stop will inherit its wheelchair_boarding behavior from the parent station, if specified in the parent.
  YES = 1, // There exists some accessible path from outside the station to the specific stop/platform.
  NO = 2, // There exists no accessible path from outside the station to the specific stop/platform.
}

// enum for location type
export enum LocationType {
  STOP = 0, // Stop (or Platform). A location where passengers board or disembark from a transit vehicle. Is called a platform when defined within a parent_station.
  STATION = 1, // Station. A physical structure or area that contains one or more platform.
  ENTRANCE_EXIT = 2, // Entrance/Exit. A location where passengers can enter or exit a station from the street. If an entrance/exit belongs to multiple stations, it can be linked by pathways to both, but the data provider must pick one of them as parent.
  GENERIC_NODE = 3, // Generic Node. A location within a station, not matching any other location_type, which can be used to link together pathways define in pathways.txt.
  BOARDING_AREA = 4, // Boarding Area. A specific location on a platform, where passengers can board and/or alight vehicles.
}
