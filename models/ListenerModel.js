const mongoose = require("mongoose");

const listenerSchema = new mongoose.Schema(
  {
    Measurements: {
      type: String,
    },
    Format: {
      type: String,
    },
    Identifier: {
      type: String,
    },
    MessageReason: {
      type: String,
    },
    EventDateTime: {
      type: Date,
    },
    PacketTimeStamp: {
      type: String,
    },
    Location: {
      NamedLocationType: {
        type: Number,
      },
      Named: {
        type: Boolean,
      },
      Interpolated: {
        type: Boolean,
      },
      GeoLocation: {
        Latitude: {
          type: Number,
        },
        Longitude: {
          type: Number,
        },
        Altitude: {
          type: Number,
        },
        GeodeticCell: {
          type: Array,
        },
        GeodeticFine: {
          type: String,
        },
      },
      NamedLocation: {
        type: String,
      },
      Address: {
        type: String,
      },
      CrossStreet: {
        type: String,
      },
      RegionTitle: {
        type: String,
      },
      RegionId: {
        type: String,
      },
    },
    UniqueId: {
      type: String,
    },
    LocationAgeMin: {
      type: String,
    },
    IgnitionState: {
      type: String,
    },
    Duration: {
      type: String,
    },
    Speed: {
      type: String,
    },
    DirectionAlpha: {
      type: String,
    },
    Odometer: {
      type: Number,
    },
    NumSatellites: {
      type: String,
    },
    IgnitionDuration: {
      type: Number,
    },
  },
  {
    timestamp: true,
    collection: "listener",
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Listener = mongoose.model("listener", listenerSchema);
module.exports = { Listener };
