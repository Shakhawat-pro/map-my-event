
export default {
  common: {
    welcome: "Welcome",
    home: "Home",
    find_event: "Find Event",
    calendar: "Calendar",
    post_event: "Post an Event",
    login: "Login",
    register: "Register",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    dashboard: "Dashboard",
    edit: "Edit",
    delete: "Delete",
    error: "Error",
    locale: "en-US",
    event: "Events"
  },


  home_page: {
    main_heading: "Looking for an event or want to post one?",
    find_event_button: "Find an event",
    post_event_button: "Post an event",
    upcoming_event_title: "Upcoming Event",
    popular_topic_title: "Popular Topic",
    deadline_alert_title: "Deadline Alert"
  },


  filter: {
    title: "Search for Events",
    search: "Search",
    searchPlaceholder: "Event name or keywords",
    location: "Location",
    locationPlaceholder: "City or venue",
    eventType: "Event Type",
    field: "Field",
    format: "Format",
    startDate: "Start Date",
    startDatePlaceholder: "Start date",
    endDate: "End Date",
    endDatePlaceholder: "End date",
    tags: "Tags",
    reset: "Reset",
    apply: "Apply"
  },


  mapPage: {
    search_placeholder: "Search events...",
    filter_events: "Filter Events",
    no_location: "Event Location Not Available",
    online_event: "This event is online or does not have a valid location."
  },




  event_card: {
    date_not_available: "Date not available",
    login_required: "Login Required",
    login_prompt: "Please login to add events to favorites",
    location_unavailable: "Event Location Not Available",
    location_unavailable_text: "This event is online or does not have a valid location.",
    added_to_favorites: "Added to favorites",
    removed_from_favorites: "Removed from favorites",
    update_failed: "Failed to update favorites",
    more_info: "More info",
    status: {
      upcoming: "Upcoming",
      closing_soon: "Closing Soon",
      ongoing: "Ongoing"
    },
    formats: {
      online: "Online",
      in_person: "In Person",
      hybrid: "Hybrid"
    }
  },

  event_details: {
    login_required: "Login Required",
    login_prompt: "Please login to add events to favorites",
    added_to_favorites: "Added to favorites",
    removed_from_favorites: "Removed from favorites",
    update_failed: "Failed to update favorites",
    load_error: "Error loading event",
    details_title: "Event Details",
    date: "Date",
    location: "Location",
    organizer: "Organizer",
    language: "Language",
    map_title: "Location Map",
    important_dates: "Important Dates",
    sub_theme_deadline: "Sub-Theme Deadline",
    article_deadline: "Article Deadline",
    registration_deadline: "Registration Deadline",
    event_type: "Event Type",
    scientific_field: "Scientific Field",
    theme: "Theme",
    more_info: "More Information",
    visit_website: "Visit Event Website",
    add_favorite: "Add to Favorites",
    remove_favorite: "Remove from Favorites",
    status: {
      new: "New",
      upcoming: "Upcoming",
      closing_soon: "Closing Soon",
      ended: "Ended"
    }
  },


  postEvent: {
    title: "Post a New Event",
    basicInfo: "Basic Information",
    eventTitle: "Event Title",
    eventType: "Event Type",
    shortDescription: "Short Description",
    detailedDescription: "Detailed Description",
    dates: "Dates",
    startDate: "Start Date",
    endDate: "End Date",
    submissionDeadline: "Submission Deadline",
    subThemeDeadline: "Sub-theme Deadline",
    registrationDeadline: "Registration Deadline",
    location: "Location",
    format: "Format",
    selectFormat: "Select a format",
    locationPlaceholder: "Location",
    city: "City",
    language: "Language",
    eventWebsite: "Event Website URL",
    selectLocation: "Select Location on Map",
    academicInfo: "Academic Information",
    scientificField: "Scientific Field",
    selectField: "Select a field",
    theme: "Theme",
    targetAudience: "Target Audience",
    organizerInfo: "Organizer Information",
    organizerName: "Organizer Name",
    tags: "Tags",
    cancel: "Cancel",
    submitEvent: "Submit Event",
    submitting: "Submitting...",
    validation: {
      required: "is required",
      endDateAfterStart: "End date must be after start date",
      selectLocation: "Please select a location on the map"
    },
    success: {
      title: "Success!",
      message: "Event has been created successfully"
    },
    error: {
      title: "Error!",
      message: "Failed to submit event. Please try again."
    }
  },


  calendar: {
    calendar_tab: "Calendar",
    favorites_tab: "Favorites",
    calendar_title: "Event Calendar",
    loading: "Loading events...",
    start_date: "Start",
    end_date: "End",
    location: "Location",
    close_button: "Close",
    status: {
      new: "New",
      upcoming: "Upcoming",
      closing_soon: "Closing Soon",
      ended: "Ended"
    },
    table: {
      title: "Title",
      location: "Location",
      date: "Date",
      deadline: "Deadline",
      status: "Status",
      actions: "Actions"
    },
    sub_theme: "Sub-theme",
    article: "Article",
    view_tooltip: "View",
    delete_tooltip: "Delete",
    remove_confirm: {
      title: "Remove from favorites?",
      text: "Are you sure you want to remove this event from your favorites?",
      confirm_button: "Yes, remove it!"
    },
    remove_success: {
      title: "Removed!",
      text: "Event has been removed from favorites."
    },
    remove_error: {
      title: "Error!",
      text: "Failed to remove event from favorites."
    }
  },




  profile: {
    title: "User Profile",
    loading: "Loading profile...",
    edit_button: "Edit Profile",
    cancel: "Cancel",
    save_button: "Save Changes",
    saving: "Saving...",
    change_photo: "Change",
    upload_hint: "Click to upload new photo",
    full_name: "Full Name",
    email: "Email",
    mobile: "Mobile",
    mobile_placeholder: "+8801XXXXXXXXX",
    occupation: "Occupation",
    occupation_placeholder: "Your profession",
    address: "Address",
    address_placeholder: "Your full address",
    not_provided: "Not provided",
    favorites: "Favorite Events",
    saved: "saved"
  },

  user_events: {
    title: "Submitted Events",
    loading: "Loading events...",
    no_events: "No events found",
    last_updated: "Last updated",
    dates: "Dates",
    location: "Location",
    audience: "Audience",
    type: "Type",
    deadlines: "Deadlines",
    sub_theme: "Sub-theme",
    article: "Article",
    registration: "Registration",
    status: {
      pending: "pending",
      approved: "approved",
      rejected: "rejected"
    },
    update_success: {
      title: "Success",
      message: "Event updated successfully"
    },
    update_error: "Failed to update event",
    delete_success: {
      title: "Success",
      message: "Event deleted successfully"
    },
    delete_error: "Failed to delete event",
    delete_confirm: {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      confirm_button: "Yes, delete it!"
    }
  },

  cookiePopup: {
    title: "Cookie settings",
    description: "We use <strong>cookies</strong> to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.",
    privacyPolicy: "Privacy Policy",
    essentialLabel: "Essential (Authentication, Session, Language)",
    analyticsLabel: "Analytics",
    acceptAll: "Accept All",
    acceptEssential: "Only Essentials"
  },

  cookie_policy: {
    title: "Cookie Policy – ConfMap",
    last_updated: "Last updated: April 2025",
    about: {
      title: "About Cookies",
      content: "Cookies are small text files stored on your device when you visit websites. They help sites work efficiently and provide information to owners."
    },
    sections: {
      how_use: {
        title: "1. How We Use Cookies",
        intro: "ConfMap uses cookies to:",
        enable_functionality: "Enable essential site functionality",
        remember_preferences: "Remember user preferences and login sessions",
        analyze_usage: "Analyze site usage to improve our services",
        support_security: "Support security features"
      },
      types: {
        title: "2. Types of Cookies We Use",
        essential: {
          title: "Essential Cookies",
          description: "Required for site operation (e.g., authentication, security)"
        },
        functional: {
          title: "Functional Cookies",
          description: "Remember preferences (e.g., language, region)"
        },
        analytics: {
          title: "Analytics Cookies",
          description: "Help us understand how visitors use our site"
        }
      },
      third_party: {
        title: "3. Third-Party Cookies",
        content: "We may use services like Google Analytics that set their own cookies. These help us analyze traffic but are governed by their own policies."
      },
      managing: {
        title: "4. Managing Cookies",
        intro: "You can control cookies through your browser settings:",
        delete: "Delete existing cookies",
        block: "Block all or certain cookies",
        set_preferences: "Set preferences for each site",
        note: "Note: Disabling essential cookies may affect site functionality."
      },
      changes: {
        title: "5. Changes to This Policy",
        content: "We may update this policy as our cookie usage evolves. Significant changes will be notified via our website."
      },
      contact: {
        title: "6. Contact Us",
        content: "For questions about our cookie usage: 📧 contact@confmap.fr"
      }
    }
  },






  footer: {
    calendar: "Calendar",
    home: "Home",
    tagline: "Discover and share scientific events worldwide.",
    quick_links: "Quick Links",
    event_map: "Event Map",
    post_event: "Post Event",
    legal: "Legal",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    contact: "Contact Us",
    about: "About",
    description: "ConfMap helps researchers and enthusiasts find and share scientific events across the globe using interactive maps and smart filters.",
    copyright: "© {{year}} ConfMap. All rights reserved."
  },

  privacy_policy: {
    title: "Privacy Policy – ConfMap",
    last_updated: "Last updated: April 2025",
    data_controller: {
      title: "Data Controller",
      company_name: "ConfMap",
      address: "[adresse de domiciliation ou société]",
      email_label: "Email"
    },
    sections: {
      information_collect: {
        title: "1. Information We Collect",
        intro: "We collect the following types of personal data:",
        account_info: "Account Information",
        account_info_detail: "Name, email when you register",
        event_info: "Event Information",
        event_info_detail: "Details submitted for conference listings",
        usage_data: "Usage Data",
        usage_data_detail: "Pages visited, interactions (via cookies)"
      },
      data_use: {
        title: "2. How We Use Your Data",
        intro: "Your data is used to:",
        provide_services: "Provide and maintain our services",
        process_submissions: "Process event submissions and user accounts",
        improve_experience: "Improve and personalize user experience",
        analyze_usage: "Analyze usage for service optimization",
        communicate_updates: "Communicate important service updates"
      },
      data_sharing: {
        title: "3. Data Sharing & Disclosure",
        content: "We do not sell your personal data. Data may be shared with: service providers (like hosting), when required by law, or to protect our rights. Event information you submit will be publicly visible on our platform."
      },
      data_retention: {
        title: "4. Data Retention",
        content: "We retain personal data only as long as necessary for the purposes collected, or as required by law. You may request deletion of your account data at any time."
      },
      your_rights: {
        title: "5. Your Rights",
        intro: "Under GDPR, you have rights to:",
        access: "Access, correct, or delete your data",
        object: "Object to or restrict processing",
        withdraw: "Withdraw consent (where applicable)",
        complaint: "Lodge a complaint with a supervisory authority",
        contact: "To exercise these rights, contact us at contact@confmap.fr."
      },
      security: {
        title: "6. Security Measures",
        content: "We implement appropriate technical and organizational measures to protect your data, including encryption, access controls, and regular security assessments."
      },
      international_transfers: {
        title: "7. International Transfers",
        content: "As our hosting is in Lithuania (EU), data is processed within the EU/EEA. If we ever need to transfer data outside these areas, we'll ensure adequate protections are in place."
      },
      policy_changes: {
        title: "8. Changes to This Policy",
        content: "We may update this policy. Significant changes will be notified via email or site notice. Continued use after changes constitutes acceptance."
      },
      contact: {
        title: "9. Contact Us",
        content: "For privacy questions or requests: 📧 contact@confmap.fr"
      }
    }
  },








  // ================== legal

  legal: {
    title: "Terms of Use – ConfMap",
    last_updated: "Last updated: April 2025",
    publisher: {
      title: "Website Publisher",
      company: "ConfMap ",
      // address: "[company address]",
      // siret: "[SIRET]",
      email_prefix: "Email",
      email: "contact@confmap.fr",
      director: "Director of publication: HORRIG Adel"
    },
    hosting: {
      title: "Hosting Provider",
      company: "HOSTINGER operations, UAB",
      address: "Švitrigailos str. 34, Vilnius 03230 Lithuania",
      email_prefix: "Email",
      email: "domains@hostinger.com"
    },
    sections: {
      object: {
        title: "1. Object",
        content: "These Terms of Use define the rules for accessing and using the website ConfMap (https://www.confmap.fr). By browsing or using the platform, you agree to comply with these terms."
      },
      access: {
        title: "2. Access to the platform",
        content: [
          "ConfMap is a web-based platform that enables users to:",
          "Explore scientific events (conferences, colloquia, etc.) on an interactive map",
          "Filter events by field, location, date, and other criteria",
          "Submit and manage events (subject to moderation)",
          "Create a personal account to bookmark or follow events",
          "Access to the website is free. Certain features (such as event submission or saving favorites) may require user registration."
        ]
      },
      accounts: {
        title: "3. User accounts",
        content: [
          "Users are responsible for maintaining the confidentiality of their login credentials. Any activity under their account is their responsibility.",
          "By creating an account, users agree to:",
          "Provide accurate and up-to-date information",
          "Refrain from using the site for illegal or abusive purposes",
          "Not impersonate another person or entity",
          "ConfMap reserves the right to suspend or delete accounts that violate these terms."
        ]
      },
      content: {
        title: "4. Event content & moderation",
        content: [
          "ConfMap allows users and partners to submit events. All submissions are subject to manual moderation.",
          "ConfMap reserves the right to:",
          "Refuse or remove any content that is inaccurate, inappropriate, or violates applicable laws",
          "Edit submissions for clarity, accuracy, or format compliance"
        ]
      },
      ip: {
        title: "5. Intellectual property",
        content: "All content on ConfMap (text, design, logo, structure) is protected by intellectual property laws. Reuse or reproduction without authorization is prohibited. User-submitted events remain the property of their authors, but by submitting, the user grants ConfMap a non-exclusive right to publish and distribute the content on the platform."
      },
      liability: {
        title: "6. Limitation of liability",
        content: "ConfMap strives to provide reliable and up-to-date information but does not guarantee the accuracy or completeness of third-party content. The platform cannot be held liable for any direct or indirect damage resulting from the use of the site or information displayed."
      },
      cookies: {
        title: "7. Cookies & personal data",
        content: "ConfMap uses cookies to improve navigation and gather anonymous analytics. For details, please refer to our Privacy Policy."
      },
      modifications: {
        title: "8. Modifications",
        content: "These terms may be updated at any time. Users will be notified of significant changes. Continued use of the platform implies acceptance of the updated terms."
      },
      contact: {
        title: "9. Contact",
        content: "For any questions regarding these Terms of Use, please contact: 📧 contact@confmap.fr"
      }
    },
    gdpr: {
      title: "Legal Basis for Data Processing",
      intro: "In accordance with Article 6 of the General Data Protection Regulation (EU) 2016/679 (GDPR), ConfMap relies on the following legal bases for processing personal data:",
      bases: {
        consent: {
          title: "1. Consent",
          description: "Some personal data is collected based on the user's explicit consent, such as:",
          items: [
            "When creating a user account",
            "When submitting an event via a form",
            "When accepting cookies used for analytics or functional purposes"
          ],
          note: "Users can withdraw their consent at any time by contacting us at contact@confmap.fr."
        },
        contract: {
          title: "2. Performance of a contract or pre-contractual measures",
          description: "When users create an account or use our services, data processing is necessary for the performance of those services, including:",
          items: [
            "Accessing and managing a personal account",
            "Registering or submitting events",
            "Using features such as favorites or event alerts"
          ]
        }
      }
    }
  }














};